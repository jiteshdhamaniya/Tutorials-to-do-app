import React from 'react';

import shortid from 'shortid';

class ToDo extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          time : new Date(),
          list: [],
          newItem:{
            text:""
          }
      }

      // lets bind all methods, this is necesarry to access this.

      this.addItem = this.addItem.bind(this);
      this.inputChange = this.inputChange.bind(this);

     // this.removeItem = this.removeItem.bind(this);

    }
  
    /**
     * this is when component has been mounted.
     */
    componentDidMount(){
       // every 10 seconds
        this.timerID = setInterval(
            () =>  this.tick(),
            1000
        )       
    }
  
    tick(){
        this.setState({
            time:new Date()
        })
    }
  
    /**
     * 
     * this is when unmount Component
     */
  
     componentWillUnmount(){
        clearInterval(this.timerID);
     }
    
    /**
      * this will add items
      * 
    */
     
    addItem(e){
        e.preventDefault();
        // Correct
        this.setState((state, props) => ({
            list: [state.newItem, ...state.list],
            newItem: {text:""}
        }));
   }

   inputChange(e){
       this.setState({
         newItem :{
             text:e.target.value,
             id:shortid.generate()
         }
       });
   }

   updateInput(id,text){
        
    const UpdateInput = this.state.list;

        UpdateInput.map( (element) => {
            if (element.id===id) {
                element.text = text
            }
        });
     
    this.setState({list:UpdateInput});

   }

   removeItem(id){
        const filteredItems = this.state.list.filter((item) =>  item.id !== id );
            this.setState({
                list: filteredItems
            }) // this.state
    } // removeItem

    /**
     * 
     * This is Render Method everytimes when component updates it calles renders method
     */
    render(){
      return(
          <div className="container">
             <div>{this.state.time.toLocaleTimeString()}</div>

             <form name="todoform" onSubmit={this.addItem} 
             className="p-5 border bg-gray-300">

                    <h1 className="mb-5">To do List</h1>  

                    <input 
                        onChange={this.inputChange} 
                        value={this.state.newItem.text} 
                        type="text" name="item" 
                        className="p-3 w-full">
                    </input>

                    <input value="Submit" type="submit" name="submit" 
                            className="rounded bg-blue-500 mt-3 p-5 text-white cursor-pointer">
                    </input>
                
             </form>   

                <ul className="w-full mt-10">
                   { this.state.list.map ( (item) => 
                                
                                <li className="w-full" 
                                    key={item.id}>

                                   <div className="flex">
                                       <div className="w-1/2">
                                          
                                           <input type="text" 
                                           onChange={(e) => this.updateInput(item.id,e.target.value) } 
                                           value={item.text} />

                                        </div>
                                       <div className="w-1/2">  
                                            <button
                                                onClick={() => this.removeItem(item.id)}
                                            >Delete</button>

                                       </div>                           
                                   </div>
                                </li>
                           
                   
                   )} 
                </ul>
            

         </div>

      );
    }
  
  };

  export default ToDo;