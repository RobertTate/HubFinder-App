$(document).ready(function () {

    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;


        // AJAX Request to GitHub:
        $.ajax({
            url: "https://api.github.com/users/" + username,
            data: {
                client_id: '87c24e4d2b884d0fb132',
                client_secret: '7946338aa3a4b9e99605fb6c1b5f04880cf7042c'
            }
        }).done(function (user) {
            $.ajax({
                url: "https://api.github.com/users/" + username + '/repos',
                data: {
                    client_id: '87c24e4d2b884d0fb132',
                    client_secret: '7946338aa3a4b9e99605fb6c1b5f04880cf7042c',
                    sort: 'created asc',
                    per_page: 6
                }
            }).done(function(repos) {
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                    <a href="${repo.html_url}" class="list-group-item list-group-item-action list-group-item-primary" target="_blank"><strong>${repo.name}</strong></a>

                    `)
                });
            })

            $('#profile').html(`
            <div class="row">
                <div class="col-md-3"> 
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top thumbnail" src="${user.avatar_url}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <a href="${user.html_url}" target="_blank">View GitHub Page</a>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 margin">
                    <h2> Repositories: </h2>
                    <div id="repos" class="list-group">
                    </div>
                </div>
            </div>
            `);
        })

    });




});