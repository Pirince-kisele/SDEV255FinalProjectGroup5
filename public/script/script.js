  const trashcan = document.querySelector('a.delete');
                       trashcan.addEventListener('click', fetchCourseDaitails)




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
                    

const edit = document.querySelector('a.update');
                       edit.addEventListener('click', (e) =>{

                        edit.setAttribute('href', `/courses/${edit.dataset.doc}/updatecourse`)
                        const updateendpoint = `/courses/${edit.dataset.doc}/updatecourse`;
                            console.log(`this is the endpoint we fech${updateendpoint}`)
                           fetch(updateendpoint, {
                               method:'put'
                              
                           })
                           .then((response) => response.json(),console.log(response))
                            .then((data) => window.location.href = data.redirect)
                           .catch(err => console.log(err));
                        
                       })