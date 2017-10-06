/**
 * 文章标签查询路由
 */

module.exports = function (req, res) {
  // db.Article.find({},function(err, docs){
  //     if (err) {
  //         return
  //     }
  //     let tagList = []
  //     let tagObj = {}
  //     for (let i=0 i<docs.length i++){
  //         let item = docs[i]
  //         if (tagObj[item.label] === undefined){
  //             tagObj[item.label] = tagList.length
  //             tagList.push({
  //                 tagName: item.label,
  //                 tagNumber: 1
  //             })
  //         }else{
  //             tagList[tagObj[item.label]].tagNumber++
  //         }
  //     }
  //     db.TagList.find({}, function(err, docs){
  //         if(err)return
  //         let resultTagList = []
  //         for (let j=0 j<docs.length j++){
  //             for (let i=0 i<tagList.length i++){
  //                 if (tagList[i].tagName == docs[j].tagName){
  //                     resultTagList.push(tagList[i])
  //                 }else if (docs[j].tagNumber==0){
  //                     resultTagList.push(docs[j])
  //                     break
  //                 }
  //             }
  //         }
  //         res.json(resultTagList)
  //     })
  // })
  db.TagList.find({}, (err, docs) => {
    if (err) {
      return
    }
    res.json(docs)
  })
}

const db = require('../../conf').db
