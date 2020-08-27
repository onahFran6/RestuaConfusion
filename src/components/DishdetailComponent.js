
  import React,{ Component} from 'react';
  import { CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Card,  Button,  Modal, ModalHeader, ModalBody, Label,Row,Col  } from 'reactstrap';
  import { Link } from 'react-router-dom';
  import { Control, LocalForm,Errors } from 'react-redux-form';
  import { Loading } from './LoadingComponent';

  

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {

constructor(props) {
    super(props);

    this.state = {
         isCommentOpen : false
    };

    this.toggleComment=this.toggleComment.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}

toggleComment(){
    this.setState({
        isCommentOpen:!this.state.isCommentOpen
    });
}


handleSubmit(values) {
  this.toggleComment();
  this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    
}



    render() {
        return (
        <React.Fragment>
            <Button outline onClick={this.toggleComment}>
        <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment                             
            </Button>

            <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
                <ModalHeader toggle={this.toggleComment}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group" >
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select  model=".rating" name="rating"
                                        className="form-control custom-select ">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Col>
                                <Label htmlFor="author">Your Name</Label>

                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3), maxLength:maxLength(15)
                                        }} />
                                    
                                       <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Col  >
                                    <Label htmlFor="comment" >Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                     rows="6"
                                     className="form-control" />
                                </Col>
                            </Row>
                           
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}
  
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
    
        
        function RenderComments({comments,addComment,dishId}) {
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
                      <div>
                        <CommentForm  dishId={dishId} addComment={addComment} />                        
                      </div>
                    </div>
                  );
           } else {
                      return(
                      <div></div>
                      );
                  }
              
              }
  
      
  
  
   const DishDetail =(props) =>{  
          
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
      else if (props.dish != null) {
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
                  <RenderComments  comments={props.comments} 
                  addComment={props.addComment}
                  dishId={props.dish.id}
                   />
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