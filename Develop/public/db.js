let db;
//create new db for budget db.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {

    // Creating object store:
    const db = event.target.result;

    //Creating autoincrement to true:
    db.createObjectStore("pending", { autoincrement: true });

};

request.onsuccess = function (event) {
    db = event.target.result;

    //check if app is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};
request.onerror = function (event) {
    console.log("Woops!" + event.target.errorCode);

};

function saveRecord(record) {
    //create a transaction on pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");

    //acess your pending object store
    const store = transaction.obectstore("pending");

    // add record  with add Method
    store.add(record);


}
function checkDatabase() {

    // open a transaction on your pending db:
    const transaction = db.transaction(["pending"], "readwrite");

    //acess your pending object store:
    const store = transaction.objectStore("pending");

    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    // if successful,open a transaction:
                    const transaction = db.transaction(["pending"], "readwrite");

                    //Access pending object store:
                    const store = transaction.objectstore("pending");

                    //Clear all items:
                    store.clear();
                });

            //listen for app coming back online
            window.addEventListener("online", checkDatabase);
        }
    }
}