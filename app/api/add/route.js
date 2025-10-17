 import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json()
    console.log(body);
    const client = await clientPromise;
    const db = client.db("LinkTree")
    const collection = db.collection("links");
    
    

    const doc = await collection.findOne({handle:body.handle})
    if(doc){
        return Response.json({
            success:false,error:true,message:'This LinkTree handle is already taken',result:null
        })
    }
    const result = await collection.insertOne(body)
    return Response.json({
        success:true,error:false,message:'Your LinkTree is created successfully',result:result
    })
   

}