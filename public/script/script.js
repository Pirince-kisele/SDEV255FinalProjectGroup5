

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
                            console.log(response)
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
 try {
    const response = await fetch('https://api.artic.edu/api/v1/artworks/search?q=cats');
    if (!response.ok){
        throw new Error (response.status)
    }
  
    const data = response.json()
    console.log(data)

 } catch (error) {
    console.log(error)
 }

 }