let currentPage = 0;
async function fetchData() {
    try {
        currentPage++;
        const socks = await fetch(`https://ecs.the-sock-exchange.com/api/socks/${currentPage}/10`).then(res => res.json());
        updateHTML(socks);
;       
    } catch (error) {
        console.error('Error:', error);
    }
}


function updateHTML(socks) {
    document.getElementById('data').innerHTML = " ";
    // Create a table element
    let table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Size</th>
            <th>Color</th>
            <th>Pattern</th>
            <th>Material</th>
            <th>Condition</th>
            <th>For Foot</th>
        </tr>
    `;

    for (let i = 0; i < socks.length; i++) {
        let sock = socks[i].sockDetails;
        console.log(sock);
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${sock.size}</td>
            <td>${sock.color}</td>
            <td>${sock.pattern}</td>
            <td>${sock.material}</td>
            <td>${sock.condition}</td>
            <td>${sock.forFoot}</td>
        `;
        table.appendChild(row);
     }
    if(socks.length === 0 ) {
        window.alert("there are no more socks to be returned and that the first sock page will be displayed again")
        currentPage = 0;
        fetchData();
    }
    document.getElementById('data').appendChild(table);
}

fetchData();