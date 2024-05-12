

const add = document.querySelector('.add')
                       add?.addEventListener('click',fetchCourse)
const trashcan = document.querySelector('.delete');
                       trashcan?.addEventListener('click', fetchCourseDaitails)



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

}catch(err){
console.log(err)
}


}
