
 
import { useParams } from "react-router-dom"
import { useUpdateLikes } from "../hooks/useBlogs"
import { useAuth } from "../hooks/useAuth"
import { BlogComment } from "./BlogComment"
import { BlogPost } from "./Styles/BlogPost"
import { relativeTime } from "../hooks/useBlogs"
import { UserLink } from "./Styles/UserLink"
import { useGetBlogId } from "../hooks/useBlogs"
import { Spinner } from "./Styles/Spinner"
 
export const Blogs = () => {
    const id = useParams().id
    //obtener el blog por id
    const {data : blog, isLoading, error} = useGetBlogId(id)
    const { state: authState } = useAuth();// Obtener el estado de autenticación usando el hook personalizado
    const updateBlogMutation= useUpdateLikes()
  
    
    if(isLoading){
        return <div><Spinner/></div>  // Mostrar un mensaje de carga
    }
        

    if (error) return <div>Error al cargar blogs: {error.message}</div>; // Mostrar un mensaje de error

    //const blog = blogs.find((blog) => blog.id === id);


    if (!blog) {
        return <div>Blog no encontrado</div>;
    }
    
  //const userLikes = blogToChange.userLikes || []; // Obtener la lista de likes del 
  const userLikes = blog.userLikes || []; // Obtener la lista de likes del blog

    
const togleLikes = (id) => {
   
  updateBlogMutation.mutate({id:id, userLikes:authState.id}); // Ejecutar la mutación con los datos del blog cambiado
}
   

  return (
    <div>
    <div className="min-h-screent bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <br />
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer">
            <div className=" mx-auto bg-white shadow-md   transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer ">
                    <UserLink
                    createdBy={
                      blog.user.username
                       
                    }
                    createdById={blog.user.id}
                  />
              </div>

              <BlogPost
                id= {blog.id}
                title={blog.title}
                author={blog.author}
                url={blog.url}
                date={relativeTime(blog.created_at)}
                likes={blog.likes}
                userLikes={userLikes}
                authState={authState}
                togleLikes={togleLikes}
                showLikeButton={true}
                showLink={true}
              />

        </div>
      </div>
    </div>
      <div>
          <BlogComment blog={blog}/>
      </div>
    </div>
  )
}
