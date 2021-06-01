import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title:"blog title test",
        author: "the great tester",
        url: "not supposed to exist",
        likes: 0,
    }
    const user = {
        username: 123
    }
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} likeFunc={mockHandler} delFunc={mockHandler} user={user}/>
    )
    
    expect(component.container).toHaveTextContent('blog title test');
    expect(component.container).toHaveTextContent('the great tester');
    expect(component.container).not.toHaveTextContent('not supposed to exist');
    expect(component.container).not.toHaveTextContent('likes');
})

test('button click render', () => {
    const blog = {
        title:"blog title test",
        author: "the great tester",
        url: "google.com",
        likes: 15,
        user: {username:456}
    }
    const user = {
        username: 123
    }
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} likeFunc={mockHandler} delFunc={mockHandler}/>
    )
    const button = component.container.querySelector('button');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('google.com');
    expect(component.container).toHaveTextContent('likes 15');
})

test('like twice', () => {
    const blog = {
        title:"blog title test",
        author: "the great tester",
        url: "google.com",
        likes: 15,
        user: {username:456}
    }
    const user = {
        username: 123
    }
    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()
    const component = render(
        <Blog blog={blog} user={user} likeFunc={mockHandler} delFunc={mockHandler2}/>
    )
    const viewButton = component.container.querySelector('.view');
    fireEvent.click(viewButton);

    const likeButton = component.container.querySelector('.like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
})
