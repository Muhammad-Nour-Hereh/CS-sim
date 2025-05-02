import { describe, it, expect } from 'vitest'

describe('hello world', () => {
  it('msg should be hello, world', () => {
    const msg = "hello world!"
    expect(msg).toBe("hello world!")
  })
})