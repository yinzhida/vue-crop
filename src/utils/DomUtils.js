/*
 * Created Date: 2018-04-25 7:51:05
 * Author: yinzhida Email: yin_zhida@163.com
 * -----
 * Last Modified: 2018-06-04 9:12:37
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 */

export const getElementPageLeft = (element) => {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
};

export const getElementPageTop = (element) => {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
};
