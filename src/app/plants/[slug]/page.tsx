import React from 'react'
import PlantCard from './PlantCard'
import { getPlantById } from '@/actions/plant.aciton';
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';


export async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }) {
   
    // Extract the id from the slug by splitting on the delimiter
    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);
    return {
      title: plant ? plant.name : "Plant Details",
      description: plant ? plant.description : "Plant details page",
    };
}
  

async function page({params}: {params: {slug: string}}) {
    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);

    if(!user) {
        return <SignIn />
    }

  return (
     <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-full">
                <PlantCard plant={plant} />
              </div>
            </div>
  )
}

export default page