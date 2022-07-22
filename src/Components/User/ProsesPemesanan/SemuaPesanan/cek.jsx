if(localStorage.getItem('myTkn')){
    if(verified === 0){
      return(
        <Navigate to='/verification' />
      )
    }else{
      return(
        <>{semuaPesanan()}</>
      )
    }
  }else{
    if(localStorage.getItem('token') === token){
      if(verified === 0){
        return(
          <Navigate to='/verification' />
        )
      }else{
        return(
          <>{semuaPesanan()}</>
        )  
      }
    }else{
      return(
        <Navigate to='/' />
      ) 
    }
}