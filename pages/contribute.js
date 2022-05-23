const Contribute = () => {
  const saveNewArchive = () => {
    const data = {}
    fetch('/api/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  const saveNewWorkshop = () => {
    const data = {
      location: { adm1: 'hi' },
      survey_origin: 'ongoing_contribution',
    }

    fetch('/api/workshops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  return (
    <>
      <div>
        Contribute
        <button onClick={saveNewWorkshop}>Create new workshop</button>
        <button onClick={saveNewArchive}>Create new archive object</button>
      </div>
    </>
  )
}

export default Contribute
