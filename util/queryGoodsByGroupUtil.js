const tags_goods_mappingDao = require('../dao/tagGoodsMappingDao');

function queryGoodsBGroup(goodsId_group) {
    const tempArr = [];
    let b = 0;
    return new Promise((res, rej) => {
        goodsId_group.forEach((ele,index) => {
            if (ele.goods_id) {
                    tags_goods_mappingDao.queryGoodsByGoodsId(ele.goods_id, result => {
                        b ++;
                        tempArr.push(...result);
                        if (b === goodsId_group.length   ) {
                            res(tempArr);
                        }
                    })
            }
        })
    })
}

module.exports.queryGoodsBGroup = queryGoodsBGroup;