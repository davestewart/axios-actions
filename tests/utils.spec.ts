import { replaceTokens } from '../src/utils/string'
import { flipKeys, getValue, isObject, isValue, reKey } from '../src/utils/object'

const payload = {
  id: 1,
  userId: 2,
  user: {
    id: 3
  }
}

describe('string utils', () => {
  describe('replace tokens', () => {
    it('should replace single ids', () => {
      expect(replaceTokens('users/:userId/posts/:id', payload)).toBe('users/2/posts/1')
    })
    it('should replace object values', () => {
      expect(replaceTokens('users/:user.id/posts/:id', payload)).toBe('users/3/posts/1')
    })
    it('should replace array values', () => {
      expect(replaceTokens('users/:userId/posts/:id', [4, 5])).toBe('users/4/posts/5')
    })
  })
})

describe('object utils', () => {
  describe('flip keys', () => {
    const obj = flipKeys({
      one: 'ONE',
      two: 'TWO',
      three: 'THREE',
    })

    it('should flip keys', () => {
      expect(Object.keys(obj)).toEqual(['ONE', 'TWO', 'THREE'])
    })
    it('should flip values', () => {
      expect(Object.values(obj)).toEqual(['one', 'two', 'three'])
    })
  })

  describe('isObject', () => {
    it('should pass for objects', () => {
      expect(isObject({})).toBe(true)
    })
    it('should fail for arrays', () => {
      expect(isObject([])).toBe(false)
    })
    it('should fail for null', () => {
      expect(isObject(null)).toBe(false)
    })
    it('should fail for undefined', () => {
      expect(isObject(undefined)).toBe(false)
    })
    it('should fail for numbers', () => {
      expect(isObject(1)).toBe(false)
    })
  })

  describe('isValue', () => {
    it('should fail for null', () => {
      expect(isValue(null)).toBe(false)
    })
    it('should fail for undefined', () => {
      expect(isValue(undefined)).toBe(false)
    })
    it('should pass for anything else', () => {
      expect(isValue(1)).toBe(true)
      expect(isValue(true)).toBe(true)
      expect(isValue({})).toBe(true)
      expect(isValue([])).toBe(true)
    })
  })

  describe('getValue', () => {
    const obj = { a: { b: { c: 1 } } }
    it('should return the right value for dot paths', () => {
      expect(getValue(obj, 'a.b.c')).toBe(1)
    })
    it('should return undefined for slash paths', () => {
      expect(getValue(obj, 'a/b/c')).toBe(undefined)
    })
    it('should return undefined for paths that are too long', () => {
      expect(getValue(obj, 'a.b.c.d')).toBe(undefined)
    })
  })

  describe('reKey', () => {
    const req = { a: 1, b: 2, c: 3 }
    const res = { A: 1, B: 2, C: 3 }
    const map = { a: 'A', b: 'B', c: 'C' }
    it('should rekey a request', () => {
      expect(reKey(req, map)).toEqual({ A: 1, B: 2, C: 3 })
    })
    it('should rekey a response', () => {
      expect(reKey(res, map, true)).toEqual(req)
    })
    it('should rekey 2 levels deep', () => {
      // not run yet
    })
  })

})
