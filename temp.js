;<div className='grid wrapper'>
  {workshops.map((workshop) => (
    <div key={workshop._id}>
      <div className='card'>
        <img src={`/api/images/${workshop.thumb_img_id}.jpg`} alt='' />
        <h5 className='pet-name'>
          {workshop.shop_name.content || workshop.shop_name.content_orig}
        </h5>
        <div className='main-content'>
          <p className='pet-name'>
            {workshop.shop_name.content || workshop.shop_name.content_orig}
          </p>
          <p className='owner'>Owner: {workshop.shop_owner_name}</p>

          {/* Extra Pet Info: Likes and Dislikes */}
          <div className='likes info'>
            <p className='label'>Likes</p>
            <ul>
              {workshop.craft_discipline.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className='dislikes info'>
            <p className='label'>Dislikes</p>
            <ul>
              {workshop.images.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className='btn-container'>
            <Link href='/[id]/edit' as={`/${workshop._id}/edit`}>
              <button className='btn edit'>Edit</button>
            </Link>
            <Link href='/[id]' as={`/${workshop._id}`}>
              <button className='btn view'>View</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
