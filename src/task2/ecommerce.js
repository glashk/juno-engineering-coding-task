//////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api/index.js";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    const allFetched = ids.map((id) =>
        fetchOrderById(id))
    return Promise.all(allFetched)
};


const bucketOrdersByUsers = async () => {
    const allUsers = await fetchAllOrders()
    let ordersByUsers = allUsers.reduce((acc, user) => {
        const { userId, id } = user
        acc[userId] ? acc[userId].push(id) : acc[userId] = [id]
        return acc
    }, {})

    // allUsers.forEach(user => {
    //     const {userId, id} = user
    //     let currentUserOrders = ordersByUsers[userId]
    //     if(currentUserOrders){
    //        currentUserOrders.push(id)
    //     } lse {
    //         ordersByUsers[userId] = [id]
    //     }
    // })
    // allUsers.filter(el => console.log(el.userId , 'sss') )

    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO:  fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.

    let ordersByUsers = []
    const allUsers = await fetchAllOrders()
    const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14
    allUsers.forEach(user => {
        const { timestamp } = user
        if (timestamp > twoWeeksAgo) {
            ordersByUsers.push(user)
        }
    })
    return ordersByUsers;
};



const bucketOrdersByDate = async () => {
    let ordersByDate = {}
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    const ordersFromLastTwoWeeks = await getLast2WeeksOrders()

    ordersFromLastTwoWeeks.forEach(order => {
        const { timestamp, userId } = order
        const convertedOrderDate = new Date(timestamp)
        const day = convertedOrderDate.getUTCDate()
        const month = convertedOrderDate.getUTCMonth() + 1
        const year = convertedOrderDate.getUTCFullYear()
        const orderDays = `${day}.${month}.${year}`

        let orderDate = ordersByDate[orderDays]

        if (orderDate) {
            orderDate.push(order)
        } else {
            ordersByDate[orderDays] = [order]
        }
    })

    return ordersByDate;
};

const allFetched = await fetchAllOrders()

// console.log(allFetched);
// .then(console.log);

const ordersbyUser = await bucketOrdersByUsers();
// .then(console.log);
// console.log(ordersbyUser);


const twoWeekOrders = await getLast2WeeksOrders();
// .then(console.log);
// console.log(twoWeekOrders);

const ordersByDay = await bucketOrdersByDate();

// .then(console.log);
console.log(ordersByDay);
////////////////////////////////////////
