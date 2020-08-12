var _BASEURL = 'http://106.52.153.11:8789/';
var _api_root = _BASEURL + 'api/';
const api = {
  login: {
    login: _api_root + 'index/login',
    userPhone: _api_root + 'indexi/get-user-phone'
  },
  common: {
    slideshow: _api_root + 'index/slideshow',
    equipment: _api_root + 'index/equipment',
    businessList: _api_root + 'index/business-list',
    customerList: _api_root + 'index/customer-list',
    lists: _api_root + 'company/lists'
  },
  equipment: {
    category: _api_root + 'equipment/category',
    detail: _api_root + 'equipment/detail',
    addCollect: _api_root + 'equipment/add-collect',
    delCollect: _api_root + 'equipment/del-collect'
  },
  company: {
    category:_api_root + 'company/category',
    detail:_api_root + 'company/detail',
    equipment:_api_root + 'company/equipment',
    addCollect:_api_root + 'company/add-collect',
    deCollect:_api_root + 'company/del-collect'
  },
  search:{
    equipment:_api_root + 'equipment/search',
    company:_api_root + 'company/search'
  },
  supply:{
    slideshow:_api_root + 'supply/slideshow',
    slideshowDetail:_api_root + 'supply/slideshow-detail',
    lists:_api_root + 'supply/lists',
    detail:_api_root + 'supply/detail',
    add:_api_root + 'supply/add'
  },
  forum:{
    slideshow:_api_root + 'forum/slideshow',
    slideshowDetail:_api_root + 'forum/slideshow-detail',
    forumCategory:_api_root + 'forum/category',
    forumLists:_api_root + 'forum/lists',
    forumDetail:_api_root + 'forum/detail',
    expertsCategory:_api_root + 'experts/category',
    expertsLists:_api_root + 'experts/lists',
    expertsDetail:_api_root + 'experts/detail'
  },
  technology:{
    slideshow:_api_root + 'technology/slideshow',
    category:_api_root + 'technology/category',
    lists:_api_root + 'technology/lists',
    detail:_api_root + 'technology/detail'
  },
  article:{
    slideshow:_api_root + 'article/slideshow',
    category:_api_root + 'article/category',
    lists:_api_root + 'article/lists',
    detail:_api_root + 'article/detail'
  },
  exhibition:{
    lists:_api_root + 'exhibition/lists',
    detail:_api_root + 'exhibition/detail',
    equipment:_api_root + 'exhibition/equipment',
    company:_api_root + 'exhibition/company',
    add:_api_root + 'exhibition/add'
  },
  activity:{
    slideshow:_api_root + 'activity/slideshow',
    slideshowDetail:_api_root + 'activity/slideshow-detail',
    lists:_api_root + 'activity/lists',
    detail:_api_root + 'activity/detail',
    add:_api_root + 'activity/add'
  },
  user:{
    userInfo:_api_root + 'user/index',
    update:_api_root + 'user/update',
    equipment:_api_root + 'user/equipment',
    company:_api_root + 'user/company',
    exhibition:_api_root + 'user/exhibition',
    activity:_api_root + 'user/activity',
    browsingArticle:_api_root + 'browsing-article',
    browsingCompany:_api_root + 'browsing-company'
  },
  configInfo:{
    contact:_api_root + 'config/contact',
    poster:_api_root + 'config/poster'
  }

};
// export default api
module.exports = api;