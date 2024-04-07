/* eslint-disable react/prop-types */
const PostCard = ({ content, publishedAt }) => {
  return (
    
      <div className="container mt-3">
        <div className="card card-post">
          <div className="card-body">   
              <div className="col-12">
                <p>{content}</p>
                <p className="card-datetime">{publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
  
  )
}

export default PostCard
