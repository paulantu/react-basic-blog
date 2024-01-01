import React, { useState, useEffect } from 'react'
import appwritreService from "../appwrite/config"
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwritreService.getPosts(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost