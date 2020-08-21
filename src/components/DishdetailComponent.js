
  import React from 'react';
  import { CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Card } from 'reactstrap';
  import { Link } from 'react-router-dom';
  
     function RenderDish({Dish}) { 
            return(
                    <div className="col-12 col-md-5 m-1 ">
                        <Card>
                        <CardImg width="100%" src={Dish.image} alt={Dish.name} />
                        <CardBody>
                        <CardTitle>{Dish.name}</CardTitle>
                        <CardText>{Dish.description}</CardText>
                        </CardBody>
                        </Card>
                    </div>
            );
        }
    
        
        function RenderComments({comments}) {
          if (comments != null){
          return (  
              <div className="col-12 col-md-5 m-1 ">
                     <h4>Comments</h4>
                     <ul className="list-unstyled">
                       {comments.map((comment) => {
                           return (      
                           <li key={comment.id}><p>{comment.comment}</p>
                           <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                           </li>
                           );
                        })}
                      </ul>
                    </div>
                  );
           } else {
                      return(
                      <div></div>
                      );
                  }
              
              }
  
      
  
  
   const DishDetail =(props) =>{  
       if(props.dish != null) {
         return( 
              <div className="container">
              <div className="row">
                <Breadcrumb>
                <BreadcrumbItem ><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active >{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
                </div>
              </div>
              <div className="row">
                   <RenderDish Dish={props.dish}/>                 
                  <RenderComments  comments={props.comments} />
              </div>
              </div>
         );
       } else {
          return(
          <div></div>
          );
      }
  
  
      }
       
  
  export default DishDetail;