import { getAllWorkshops } from '../lib/apiUtils'

const Discover = ({ workshops }) => {
  console.log(workshops[0])
  return (
    <>
      <div>Discover</div>
    </>
  )
}

/* Retrieves workshops data from mongodb database */
export async function getServerSideProps() {
  const workshops = await getAllWorkshops()
  return { props: { workshops } }
}

export default Discover
