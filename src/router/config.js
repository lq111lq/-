import NewSong from '@/views/newSong/newSong';
import Rank from '@/views/rank/rank';
import Plist from '@/views/plist/plist';
import Singer from '@/views/singer/singer';
import SingerList from '@/views/singer/singer-list';
import SingerInfo from '@/views/singer/singer-info';
import Search from '@/views/search/search';
import RankInfo from '@/views/rank/rankinfo';
import PlistInfo from '@/views/plist/plistinfo';
let navData = [
  {
    title: '新歌',
    path: '/',
    name:'NewSong',
    component: NewSong
  },
  {
    title: '排行',
    path: '/rank',
    name:'Rank',
    component: Rank
  },
  {
    title: '歌单',
    path: '/plist',
    name:'Plist',
    component: Plist
  },
  {
    title: '歌手',
    path: '/singer',
    name:'Singer',
    component: Singer
  }
]
let other = [
  {
    path: '/search',
    title: '搜索',
    name:'Search',
    component: Search,
    props: true,
  },
  {
    path: '/singer/list/:classid',
    title: '歌手列表',
    name:'SingerList',
    component: SingerList
  },
  {
    path: '/singer/info/:singerid',
    title: '歌手信息',
    name:'SingerInfo',
    component: SingerInfo
  },
  {
    path:'/rank/info/:rankid',
    title:'排行详情',
    name:'RankInfo',
    component:RankInfo
  },
  {
    path:'/plist/list/:specialid',
    title:'歌单详情',
    name:'PlistInfo',
    component:PlistInfo
  }
]
export { navData, other };