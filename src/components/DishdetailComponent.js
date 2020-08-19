import React from 'react';
import { CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

   function RenderDish({Dish}) { 
          return(
                  <div>
                      <CardImg width="100%" src={Dish.image} alt={Dish.name} />
                      <CardBody>
                      <CardTitle>{Dish.name}</CardTitle>
                      <CardText>{Dish.description}</CardText>
                      </CardBody>
                  </div>
          );
      }
  
      
      function RenderComments({commen}) {
        
            const menu = commen.map((comment) => {
                if (comment.comment!=null){
                    
                return (
                  <div key={comment.id} >
                      <ul className="list-unstyled">
                         <li>{comment.comment}</li>
                         <li>{`--${comment.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</li>
                      </ul>
                  </div>
                );
                } else {
                    return<div></div>
                }
            
            });
    
            return (
                    <div>
                        {menu}
                    </div>
              );
       
    }

    


 const Dishdetail = (props)  =>{   
       return( 
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1 " >
                    <card>
                        <RenderDish Dish={props.dish}/>
                    </card>
                </div>
                <div className="col-12 col-md-5 m-1 ">
                   <h4>Comments</h4>
                   <RenderComments  commen={props.dish.comments} />
               </div>
            </div>
            </div>
       );

    }
     

export default Dishdetail;