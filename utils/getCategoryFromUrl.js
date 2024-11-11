const getCategoryFromUrl = (url) => {
    const urlParams = new URL(url).searchParams;
    const contextCategory = urlParams.get('channel[context_category]');
    return contextCategory;
};

// Example usage
// const url = 'https://www.pornhub.org/_xa/ads?zone_id=1845501&site_id=23&preroll_type=json&channel%5Bcontext_tag%5D=chinese-model%2Cdoggystyle%2C4k%2Cchinese-student%2Cpoint-of-view%2Casian-creampie%2Ccum-inside%2Chot-chinese-girl%2Cbabe%2Cromantic-couple%2Cmissionary%2Csex-vlog%2Ccute%2Cbig-ass%2Cstory-sex%2Cpink-pussy&channel%5Bcontext_category%5D=Asian%2CBabe%2CCreampie%2CHardcore%2CTeen-%2818%2B%29%2CJapanese%2CExclusive%2CVerified-Amateurs&channel%5Bcontext_pornstar%5D=&channel%5Binfo%5D=%7B%22actor_id%22%3A2361189971%2C%22content_type%22%3A%22model%22%2C%22video_id%22%3A440716571%2C%22timestamp%22%3A1731151501%2C%22hash%22%3A%228cfe2f7624f9b4f17748fd6355e29868%22%2C%22session_id%22%3A%22406428146172463918%22%7D&noc=0&cache=1731151501&t_version=2024110701.ded8395&channel%5Bsite%5D=pornhub';

// console.log(getContextCategory(url));
module.exports = getCategoryFromUrl