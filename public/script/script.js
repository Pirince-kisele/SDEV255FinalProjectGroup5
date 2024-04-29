  const trashcan = document.querySelector('a.delete');
                       trashcan.addEventListener('click', (e) =>{
                           const endpoint = `/courses/${trashcan.dataset.doc}`;
                            console.log(`this is the endpoint we fech${endpoint}`)
                           fetch(endpoint, {
                               method:'delete'
                           })
                           .then((response) => response.json())
                            .then((data) => window.location.href = data.redirect)
                           .catch(err => console.log(err));
                       })
                    

const edit = document.querySelector('a.update');
                       edit.addEventListener('click', (e) =>{
                        const updateendpoint = `/courses/${edit.dataset.doc}`;
                            console.log(`this is the endpoint we fech${updateendpoint}`)
                           fetch(updateendpoint, {
                               method:'put'
                           })
                           .then((response) => response.json())
                            .then((data) => window.location.href = data.redirect)
                           .catch(err => console.log(err));

                       })