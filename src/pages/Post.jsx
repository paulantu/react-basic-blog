import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function Post() {

    const [post, setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPosts(slug).then((post) => {
                if (post) {
                    setPost(post);
                }else{
                    navigate("/");
                }
            })
        }else{
            navigate("/")
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img src={appwriteService.getFilePreview(post.thumbnail)} alt={post.title} className='rounded-xl' />

                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>{parse(post.excerpt)}</div>
        </Container>
    </div>
  ) : null;
}

export default Post