const APIFeatures = (query, queryStr) => {
    const search = () => {
        let keyword = queryStr.keyword ? {
            name: {
                $regex: queryStr.keyword,
                $options: 'i'
            }
        } : {};

        query = query.find({ ...keyword });
        return { query, queryStr, search, filter };
    };

    const filter = () => {
        const queryStrCopy = { ...queryStr };

        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);
        query = query.find(queryStrCopy);
        return { query, queryStr, search, filter };
    };

    return { query, queryStr, search, filter };
};

module.exports = APIFeatures;


// class APIFeatures {
//     constructor(query, queryStr){
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     search(){
//        let keyword =  this.queryStr.keyword ? {
//             name: {
//                 $regex: this.queryStr.keyword,
//                 $options: 'i'
//             }
//        }: {};

//        this.query.find({...keyword})
//        return this;
//     }


//     filter(){
//         const queryStrCopy = { ...this.queryStr };
  
//         //removing fields from query
//         const removeFields = ['keyword', 'limit', 'page'];
//         removeFields.forEach( field => delete queryStrCopy[field]);
        
//         let queryStr = JSON.stringify(queryStrCopy);
//         queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

//         this.query.find(JSON.parse(queryStr));

//         return this;
//     }

//     paginate(resPerPage){
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resPerPage * (currentPage - 1)
//         this.query.limit(resPerPage).skip(skip);
//         return this;
//     }
// }

// module.exports = APIFeatures;