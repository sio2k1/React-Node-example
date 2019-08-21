import React from 'react'
import './page_json_parser.css';
import './flipcards.css';

const return_article_content = (json) => { //parsing an artical content to get parag. and img from json
  return ( 
    <div className="article-content-centerer"><div className="article-content">
    {json.map((parag) => {
      if (parag.paragraph !== undefined)
      {
        return (<p>{parag.paragraph}</p>)
      } else 
      if (parag.img !== undefined)
      {
        return (
        <div className="img-article-container">
          <img className="img-article" src={require('../../images/'+parag.img)} alt={parag.alt} />
        </div>
        )
      } else
      {
        return (<div></div>)
      }
    })}
    </div></div>
  )
}

const return_pic_grid = (json) => { //parsing header and footer
  
  const GenCard = props => // we return card here, if there is a text we return flip card
  {
    const pic = props.pic;

    if (pic.flipcardtext!==undefined)
    {
      return  (
        <div className="td-pic">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img className="t-img-auto" src={require('../../images/'+pic.src)} alt={pic.alt} />
              </div>
              <div className="flip-card-back">
                <p>{pic.flipcardtext}</p> 
              </div>
            </div>
          </div>
        </div>
      )
    }
    else
    {
      return  (
        <div className="td-pic">
          <img className="t-img-auto" src={require('../../images/'+pic.src)} alt={pic.alt} />
        </div> 
      )
    }


  }
  

  if (json!== undefined) //if header or footer exists in json
  {

    return ( 
      <div className="pic-table-centerer"><table className="pic-table"><tr>
      {
        json.map((pic) => 
          <td>
            <GenCard pic={pic} />
          </td>)
      }
      </tr></table></div>
    )

  } else //if header or footer not exists in json return empty div
  {
    return(<div></div>); // there is no header table
  }

 
}

const json_parser = (json) => {
    return (
      <div>
        <div className="text-box">
        {return_pic_grid(json.header_pic)}
        {return_article_content(json.data_p)}
        {return_pic_grid(json.bottom_pic)} 
        </div> 
      </div>
      )
    }
    
export default json_parser;