import request from '@/utils/request'

export function fetchList(query) {
  // return request({
  //   url: '/article/list',
  //   method: 'get',
  //   params: query
  // })
  
  return {
    code: 20000,
    data: {
      total: 3,
      items: [
        {
          id: '@increment',
          timestamp: "2020-01-01 18:12:12",
          author: 'first',
          reviewer: 'first',
          title: '222',
          content_short: '222',
          content: '455',
          forecast: '222',
          importance: '123',
          'type': 'CN',
          'status': published,
          display_time: "2020-01-01 18:12:12",
          comment_disabled: true,
          pageviews: '10',
          platforms: ['a-platform']
        },
        {
          id: '@increment',
          timestamp: "2020-01-01 18:12:12",
          author: 'first',
          reviewer: 'first',
          title: '222',
          content_short: '222',
          content: '455',
          forecast: '222',
          importance: '123',
          'type': 'CN',
          'status': published,
          display_time: "2020-01-01 18:12:12",
          comment_disabled: true,
          pageviews: '10',
          platforms: ['a-platform']
        },
        {
          id: '@increment',
          timestamp: "2020-01-01 18:12:12",
          author: 'first',
          reviewer: 'first',
          title: '222',
          content_short: '222',
          content: '455',
          forecast: '222',
          importance: '123',
          'type': 'CN',
          'status': published,
          display_time: "2020-01-01 18:12:12",
          comment_disabled: true,
          pageviews: '10',
          platforms: ['a-platform']
        }
      ]
    }
  }
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
