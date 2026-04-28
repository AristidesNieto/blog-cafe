import { Link } from 'react-router'

export function CardList({entries, filteredText}){
  const cards = entries.map(entry => entry.title.includes(filteredText) && <Card key={entry.id} id_post={entry.id} title={entry.title} description={entry.des} img={entry.img} />)
  return(
    <div className='card-list'>
      {cards}
    </div>
  )
}

export function Card({id_post, img, title, description}){
  return(
    <Link to={"/blog/"+id_post} className='card'>
      <img src={img} alt={title}></img>
      <h1>{title}</h1>
      <p>{description}</p>
    </Link>
  )
}