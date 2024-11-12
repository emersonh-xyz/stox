'use client';

export default function CreatePost() {

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Create a Post</h1>
            <div className=" bg-base-300 flex flex-col gap-2 rounded-3xl">
                <div className=" p-4 gap-4 flex flex-col">
                    <label>Description</label>
                    <input className="bg-base-100 p-2 rounded-2xl" placeholder="Enter a description" />
                    <button className="bg-primary text-white rounded-3xl p-2">Create a Post</button>
                </div>
            </div>
        </div>
    )
}