if(localStorage.getItem('myTkn')){
    if(localStorage.getItem('myTkn') === token){
        return(
            <Navigate to='/homeadmin' />
          )
    }
  }else{
    if(localStorage.getItem('token') === token){
        return(
            <Navigate to='/homeadmin' />
        )
    }
}