

const add = document.querySelector('.add')
                       add?.addEventListener('click',fetchCourse)
const trashcan = document.querySelector('.delete');
                       trashcan?.addEventListener('click', fetchCourseDaitails)
const edit = document.querySelector('.edit')
edit?.addEventListener('click', ()=>{
    console.log("yesssss")
    edit.setAttribute('href', `/edit/${edit.dataset.doc}`)
})


// the async function to go to update



// the async function to delete the course by is id
                       async function fetchCourseDaitails (){
                        try {
                             const endpoint = `/courses/${trashcan.dataset.doc}`;
                        const response = await fetch(endpoint, {method:'delete'})
                      
                            const data = await response.json()
                            console.log(data)
                            window.location.href = data.redirect

                      
                        } catch (error) {
                            console.log(error)
                        }
                       


                       }
            




// the async function to 
 async function fetchCourse (){
 const endpoints =`/courses/${add.dataset.doc}`;
try{
    const response = await fetch(endpoints,{method:'get'})
    console.log(response)
    const data = await response.json()
    console.log(data.course)
      window.location.href = data.redirect

}catch(err){
console.log(err)
}


}
