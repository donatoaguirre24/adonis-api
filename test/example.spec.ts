import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Posts', () => {
  test('ensure create works', async (assert) => {
    const response = await supertest(BASE_URL)
      .post('/posts')
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.title = 'Test post'
        res.body.content = 'Dummy post'
      })
      .expect('Content-Type', /json/)
      .expect(200)

    assert.deepEqual(response.body, {
      post: {
        title: 'Test',
        content: 'Dummy post',
      },
    })
  })

  test('ensure index works', async (assert) => {
    const response = await supertest(BASE_URL)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.deepEqual(response.body, { posts: [] })
  })
})
