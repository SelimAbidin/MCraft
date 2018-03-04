
const createID = (function () {
    
    let _id = 99
    function idCreater() {
        return 'id_' + (++_id)
    }

    return idCreater
})()

export default createID