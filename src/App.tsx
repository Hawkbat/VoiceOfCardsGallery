import React, { memo, useEffect, useState } from 'react'
import './App.css'
import cardNameUri from './data/card_name_text.csv'
import cardDescUri from './data/card_desc_text.csv'
import cardUri from './data/card_mst.csv'
import itemUri from './data/item_mst.csv'
import collectionUri from './data/collection_mst.csv'
import skillUri from './data/skill_mst.csv'

async function fetchCsv(uri: string): Promise<string[][]> {
  const text = await (await fetch(uri)).text()
  const lines = parseCsv(text)
  return lines
}

function parseCsv(csv: string): string[][] {
  let i = 0
  const lines = []
  let values = []
  csv = csv.replaceAll('\r\n', '\n')
  while (i < csv.length) {
    const commaIndex = csv.indexOf(',', i)
    const lineIndex = csv.indexOf('\n', i)
    const nextComma = commaIndex < 0 ? csv.length : commaIndex
    const nextLine = lineIndex < 0 ? csv.length : lineIndex
    const nextSeparator = Math.min(nextComma, nextLine)

    if (csv[i] === '"') {
      let closingQuote = csv.indexOf('"', i + 1)
      while (csv[closingQuote + 1] === '"')
        closingQuote = csv.indexOf('"', closingQuote + 2)
      values.push(csv.substring(i + 1, closingQuote).replaceAll('""', '"'))
      i = closingQuote + 1
    } else {
      values.push(csv.substring(i, nextSeparator))
      i = nextSeparator + 1
    }

    if (nextLine < nextComma || i >= csv.length) {
      lines.push(values)
      values = []
    }
  }
  return lines
}

interface Card {
  id: number
  type: CardType
  nameId: number
  descId: number
  front: string
  overlays: string[]
  land: string
  back: string
  backOverlays: string[]
  field2: number
  field10: boolean
}

interface CardSide {
  type: CardType
  name: string
  desc: string
  atk?: number
  def?: number
  spd?: number
  vit?: number
  gems?: number
  images: string[]
}

enum CardType {
  Character = 1,
  Monster = 2,
  Skill = 3,
  Item = 4,
  Land = 5,
  Equipment = 9,
  Status = 10,
  Ending = 11,
  Passive = 12,
  Dialogue = 20,
  Info = 30,
  Popup = 31,
  Mystery = 35,
  Money = 41,
  MysteryHint = 42,
  Customization = 45,
  Chapter = 46,
  Objective = 50,
  CustomizeOff = 62,
  PlayingCard = 70,
  PlayingEvent = 71,
  Menu = 98,
  BattleResult = 99,
  CustomizeDesc = 111,
  CustomizeInfo = 140,
}

interface CollectionItem {
  id: number
  type: CollectionType
  cardId: number
  cardIdBack: number
  nameId: number
  descId: number
  descIdBack: number
  fields: string[]
}

enum CollectionType {
  Items = 0,
  Equipment = 1,
  KeyItems = 2,
  KeyItemsAlt = KeyItems + 10,
  Characters = 3,
  CharactersAlt = Characters + 10,
  Monsters = 4,
  Skills = 5,
  Ending = 6,
  Movies = 7,
}

interface Item {
  id: number
  cardId: number
  isTorch: boolean
  type: ItemType
  field4: number
  buy: number
  sell: number
  useType: number
  field8: number
  atk: number
  def: number
  spd: number
  vit: number
  field13: number[]
  users: number[]
}

enum ItemType {
  Item = 1,
  Equipment = 2,
  KeyItem = 3,
  Customization = 4,
}

interface Skill {
  id: number
  cardId: number
  element: ElementType
  cost: number
  field4: number
  field5: number
  field6: number
  field7: number
}

enum ElementType {
  None = 0,
  Fire = 1,
  Water = 2,
  Bolt = 3,
  Wind = 4,
  Light = 5,
  Dark = 6,
}

function substitute(s: string, names: Map<number, string>) {
  s = s.replace(/{CARDNAME:(\d+)}/g, (_, id) => names.get(parseInt(id)) ?? '')
  s = s.replace(/<IME(\d+)>/g, '')
  s = s.replace(/<highlight>(.*)<\/highlight>/g, (_, text) => `<b>${text}</b>`)
  //s = s.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  return s
}

function formatEnum<K extends number, T extends Record<K, string>>(v: K, obj: T): string {
  return obj[v].replace(/([a-z])([A-Z])/g, (_, a, b) => `${a} ${b}`)
}

function int(s: string): number {
  return s ? parseInt(s, 10) : 0
}

function ints(s: string): number[] {
  return s ? s.split('@').map(s => int(s)) : []
}

function reactJsonReplacer(this: any, k: string, v: any): any {
  if (k === 'children') {
    if (!v) return v
    if (Array.isArray(v)) return v.map(o => o.props)
    else return v.props
  }
  return v
}

function deepEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a, reactJsonReplacer) === JSON.stringify(b, reactJsonReplacer)
}

function getInfoCardSides(name: string, desc: string, descBack: string): { front: CardSide, back: CardSide } {
  return {
    front: {
      type: CardType.Info,
      name,
      desc,
      images: ['ca-01_img_card_text-01-02'],
    },
    back: {
      type: CardType.Info,
      name,
      desc: descBack,
      images: ['ca-01_img_card_text-01-02'],
    },
  }
}

function getMenuCardSides(name: string): { front: CardSide, back: CardSide } {
  return {
    front: {
      type: CardType.Menu,
      name,
      desc: '',
      images: ['ca-01_img_menu_front'/*, 'ca-01_img_menu_front_gold'*/],
    },
    back: {
      type: CardType.Menu,
      name,
      desc: '',
      images: ['ca-01_img_menu_reverse'/*, 'ca-01_img_menu_reverse_gold'*/],
    },
  }
}

function getActualCardSides(c: Card, names: Map<number, string>, descs: Map<number, string>): { front: CardSide, back: CardSide } {
  const name = substitute((c.nameId ? names.get(c.nameId) : null) ?? names.get(c.id) ?? '', names)
  const desc = substitute((c.descId ? descs.get(c.descId) : null) ?? descs.get(c.id) ?? '', names)

  return {
    front: {
      type: c.type,
      name,
      desc,
      images: [c.land, c.front/*, ...c.overlays*/],
    },
    back: {
      type: c.type,
      name: '',
      desc: '',
      images: [c.back/*, ...c.backOverlays*/],
    },
  }
}

const CardSideBox = memo(function CardSideBox({ card, side }: { card: CardSide, side: 'front' | 'back' }) {
  return <div className={`${side} CardType${card.type}`}>
    {card.images.map(o => o ? <img key={o} src={`images/${o}.png`} alt="" /> : null)}
    {card.name && <div className="CardName" dangerouslySetInnerHTML={{ __html: card.name }}></div>}
    {card.desc && <div className="CardDesc" dangerouslySetInnerHTML={{ __html: card.desc }}></div>}
    {card.atk !== undefined && <div className="CardATK">{`${card.atk >= 0 ? '+' : ''}${card.atk}`}</div>}
    {card.def !== undefined && <div className="CardDEF">{`${card.def >= 0 ? '+' : ''}${card.def}`}</div>}
    {card.spd !== undefined && <div className="CardSPD">{`${card.spd >= 0 ? '+' : ''}${card.spd}`}</div>}
    {card.vit !== undefined && <div className="CardVIT">{`${card.vit >= 0 ? '+' : ''}${card.vit}`}</div>}
    {card.gems && <div className="CardGems">{new Array(card.gems).fill(0).map((_, i) => <div key={i} className="CardGem" />)}</div>}
  </div>
}, deepEqual)

const CardBox = memo(function CardBox({ front, back, flip, zoom, onClick, children }: { front: CardSide | null, back: CardSide | null, flip?: boolean, zoom?: boolean, onClick?: () => void, children?: React.ReactNode }) {
  return <div className={`CardBox ${zoom ? 'zoom' : ''}`} onClick={() => onClick?.()} style={{ transform: `rotate(${-2 + Math.random() * 4}deg)` }}>
    {children}
    <div className={`Card ${flip ? 'flip' : ''}`}>
      {front && <CardSideBox side="front" card={front} />}
      {back && <CardSideBox side="back" card={back} />}
    </div>
  </div>
}, deepEqual)

const CollectionCardBox = memo(function CollectionCardBox({ item, cards, items, skills, names, descs }: { item: CollectionItem, cards: Map<number, Card>, items: Map<number, Item>, skills: Map<number, Skill>, names: Map<number, string>, descs: Map<number, string> }) {
  const [flipped, setFlipped] = useState(false)
  const card = cards.get(item.cardId)
  if (!card) return null
  let { front, back } = getActualCardSides(card, names, descs)
  let canFlip = false
  switch (item.type) {
    case CollectionType.Characters:
    case CollectionType.Monsters:
    case CollectionType.KeyItemsAlt:
      front.name = ''
      front.desc = ''
      break
    case CollectionType.CharactersAlt:
      canFlip = true
      break
    case CollectionType.Ending:
      const altCard = cards.get(item.cardIdBack)
      if (altCard) back = getActualCardSides(altCard, names, descs).front
      canFlip = true
      break
    case CollectionType.Equipment:
      const equip = items.get(item.cardId)
      if (equip) front = { ...front, atk: equip.atk, def: equip.def, spd: equip.spd, vit: equip.vit }
      break
    case CollectionType.Skills:
      const skill = skills.get(item.cardId)
      if (skill) front.gems = skill.cost
      break
  }
  let infoName = ''
  let infoDesc = ''
  let infoDescBack = ''
  switch (item.type) {
    case CollectionType.Characters:
    case CollectionType.CharactersAlt:
    case CollectionType.Monsters:
      infoName = substitute(names.get(item.nameId) ?? '', names)
      infoDesc = substitute(descs.get(item.descId) ?? '', names)
      infoDescBack = substitute(descs.get(item.descIdBack) ?? '', names)
      break
  }
  return <CardBox front={front} back={canFlip ? back : null} flip={flipped && canFlip} zoom onClick={() => [CollectionType.Characters, CollectionType.CharactersAlt, CollectionType.Monsters, CollectionType.Ending].includes(item.type) && setFlipped(f => !f)}>
    {infoName || infoDesc || infoDescBack ? <div className="InfoCard"><CardBox {...getInfoCardSides(infoName, infoDesc, infoDescBack)} flip={flipped}></CardBox></div> : null}
  </CardBox>
}, deepEqual)

function App() {
  const [cardNames, setCardNames] = useState<Map<number, string>>(new Map())
  const [cardDescs, setCardDescs] = useState<Map<number, string>>(new Map())
  const [cards, setCards] = useState<Map<number, Card>>(new Map())
  const [items, setItems] = useState<Map<number, Item>>(new Map())
  const [skills, setSkills] = useState<Map<number, Skill>>(new Map())
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([])
  const [collectionType, setCollectionType] = useState(window.location.hash ? window.location.hash.substr(1) : CollectionType[CollectionType.Items])

  useEffect(() => {
    (async function () {
      const cardNamesCsv = await fetchCsv(cardNameUri)
      const cardNames = new Map<number, string>()
      for (const r of cardNamesCsv) cardNames.set(int(r[0]), r[1])
      setCardNames(cardNames)

      const cardDescsCsv = await fetchCsv(cardDescUri)
      const cardDescs = new Map<number, string>()
      for (const r of cardDescsCsv) cardDescs.set(int(r[0]), r[1])
      setCardDescs(cardDescs)

      const cardsCsv = await fetchCsv(cardUri)
      const cards = new Map<number, Card>()
      for (const r of cardsCsv) cards.set(int(r[0]), { id: int(r[0]), type: int(r[1]), nameId: int(r[3]), descId: int(r[4]), land: r[5], front: r[6], overlays: r[7].split('@'), back: r[8], backOverlays: r[9].split('@'), field2: int(r[2]), field10: r[10] === '1' })
      setCards(cards)

      const itemsCsv = await fetchCsv(itemUri)
      const items = new Map<number, Item>()
      for (const r of itemsCsv) items.set(int(r[0]), { id: int(r[0]), cardId: int(r[1]), isTorch: r[2] === '1', type: int(r[3]), field4: int(r[4]), buy: int(r[5]), sell: int(r[6]), useType: int(r[7]), field8: int(r[8]), atk: int(r[9]), def: int(r[10]), spd: int(r[11]), vit: int(r[12]), field13: ints(r[13]), users: ints(r[14]) })
      setItems(items)

      const skillsCsv = await fetchCsv(skillUri)
      const skills = new Map<number, Skill>()
      for (const r of skillsCsv) skills.set(int(r[1]), { id: int(r[0]), cardId: int(r[1]), element: int(r[2]), cost: r[3] ? int(r[3].split(':')[1]) : 0, field4: int(r[4]), field5: int(r[5]), field6: int(r[6]), field7: int(r[7]) })
      setSkills(skills)

      const collectionItemsCsv = await fetchCsv(collectionUri)
      const collectionItems: CollectionItem[] = []
      for (const r of collectionItemsCsv) collectionItems.push({ id: int(r[0]), type: int(r[1]), cardId: int(r[2]), cardIdBack: int(r[3]), nameId: int(r[4]), descId: int(r[6]), descIdBack: int(r[7]), fields: r })
      setCollectionItems(collectionItems)
    })()
  }, [])

  useEffect(() => {
    const handler = () => {
      setCollectionType(window.location.hash ? window.location.hash.substr(1) : CollectionType[CollectionType.Items])
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handler)
    return () => {
      window.removeEventListener('hashchange', handler)
    }
  }, [])

  return <div className="App">
    <div className="LeftMenu">
      {(Object.values(CollectionType) as CollectionType[]).filter(c => c < 10).reverse().map(c => <a key={c} href={`#${CollectionType[c]}`} className="MenuCard">
        <CardBox {...getMenuCardSides(formatEnum(c, CollectionType))} flip={collectionType !== CollectionType[c]} onClick={() => { window.location.hash = CollectionType[c]; window.scrollTo(0, 0) }} />
      </a>)}
    </div>
    {(collectionType === CollectionType[CollectionType.Characters] || collectionType === CollectionType[CollectionType.Monsters]) && <div className="RightMenu" />}
    <div className="Content">
      <div id={`${collectionType}List`} className="CardList" key={collectionType}>
        {collectionItems.filter(i => CollectionType[i.type % 10] === collectionType).map(c => <CollectionCardBox key={c.id} item={c} cards={cards} items={items} skills={skills} names={cardNames} descs={cardDescs} />)}
      </div>
    </div>
    <div className="Footer">
      This website is a fan-produced derivative work. All artwork, text, iconography, and other content are copyright © 2021 SQUARE ENIX CO., LTD.
    </div>
  </div>
}

export default App
