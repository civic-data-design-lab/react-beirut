import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Workshop from '../models/Workshop'

const Index = ({ workshops }) => (
  <>
    {/* Create a card for each pet */}
    {workshops.map((workshop) => (
      <div key={workshop._id}>
        <div className="card">
          {/* <img src={workshop.image_url} /> */}
          <h5 className="pet-name">{workshop.shop_name.content || workshop.shop_name.content_orig}</h5>
          <div className="main-content">
            <p className="pet-name">{workshop.shop_name.content || workshop.shop_name.content_orig}</p>
            <p className="owner">Owner: {workshop.shop_owner_name}</p>

            {/* Extra Pet Info: Likes and Dislikes */}
            <div className="likes info">
              <p className="label">Likes</p>
              <ul>
                {workshop.craft_discipline.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>
            <div className="dislikes info">
              <p className="label">Dislikes</p>
              <ul>
                {workshop.images.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${workshop._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${workshop._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Workshop.find({})
  const workshops = result.map((doc) => {
    const workshop = doc.toObject()
    workshop._id = workshop._id.toString()
    return workshop
  })

  return { props: { workshops } }
}

export default Index
