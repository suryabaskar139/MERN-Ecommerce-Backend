const APIFeatures = (query, queryStr) => {
    const search = () => {
        let keyword = queryStr.keyword ? {
            name: {
                $regex: queryStr.keyword,
                $options: 'i'
            }
        } : {};

        query = query.find({ ...keyword });
        return { query, queryStr, search, filter, paginate };
    };

    const filter = () => {
        const queryStrCopy = { ...queryStr };

        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);
        let queStr = JSON.stringify(queryStrCopy);
        queStr =  queStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)
        console.log(JSON.parse(queStr));

        query = query.find(JSON.parse(queStr));
        return { query, queryStr, search, filter, paginate };
    };

    const paginate = (responsePerPage) => {

        const currentPage = Number(queryStr.page) || 1;

        const skip = responsePerPage * (currentPage - 1);
        query = query.limit(responsePerPage).skip(skip);

        // if  ?page=1 query parameter -> it will give per page 3 records 
        // if we wont give query parameter -> it will give per page 3 records 
        // if we want all records when we won't give query parameter uncomment above code comment below code

        if (currentPage) {
            const skip = responsePerPage * (currentPage - 1);
            query = query.limit(responsePerPage).skip(skip);
          } else {
            query = query; // no limit or skip
          }

        return { query, queryStr, search, filter, paginate }


    }

    return { query, queryStr, search, filter, paginate };
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