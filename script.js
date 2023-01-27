
      let buttonGetData = document.getElementById("get-data");
      let sectionTables = document.getElementById("tables");
      let spinnerRef = document.getElementById("spinner");

      buttonGetData.addEventListener("click", showDataDOM);
      async function showDataDOM() {
        spinnerRef.classList.remove("d-none");
        let dataAllOptions = await checkTime();
        if (dataAllOptions) {
          sectionTables.innerHTML = `
          <table class="table text-center table-info table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th> No. </th>
            <th> Nombre </th>
            <th> Correo Electrónico </th>
            <th> Foto </th>

          </tr>
        </thead>
      <tbody>
        ${dataAllOptions.map(mapperData).join("")}
          </tbody>
          </table>
          `;
          spinnerRef.classList.add("d-none");
        }
      }
      function mapperData(item) {
        return `<tr>
                  <td>${item.id}</td>
                  <td>${item.first_name} ${item.last_name}</td>
                  <td>${item.email}</td>
                  <td><img class='img-thumbnail rounded-circle' src=${item.avatar}></td>
              </tr>`;
      }
      async function getData() {
        try {
          const data = await fetch("https://reqres.in/api/users?delay=3");
          const parseData = await data.json();
          return parseData.data;
        } catch (error) {
          console.error(error, "Fetch Failure");
        }
      }
      function getMinutesFuture() {
        let date = new Date();
        date.setMinutes(date.getMinutes() + 1);
        return date;
      }
      async function newData() {
        let data = await getData();
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("time", getMinutesFuture());
        return getDataFromLocalStorage();
      }
      function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem("data"));
      }
      function checkTime() {
        let storedTime = new Date(localStorage.getItem("time"));
        let currentTime = new Date();
        if (currentTime > storedTime) {
          localStorage.removeItem("data");
          localStorage.removeItem("time");
          return newData();
        }
        return getDataFromLocalStorage();
      }
