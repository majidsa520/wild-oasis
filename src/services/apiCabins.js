import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");
	if (error) return error;
	return data;
}

export async function deleteCabin(id) {
	const { error, data } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		throw new Error("Cabin could not be deleted.");
	}
	return data;
}

export async function createCabin(newCabin, id) {
	const hasImage = typeof newCabin.image === "string";
	// https://ohxvrgskowfwbbgwjlvo.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	// create image url OR just using existing url for updating cabin
	const imageUrl = hasImage
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	// 1.Create Cabin:
	let query = supabase.from("cabins");
	// for create:
	if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);
	// for edit:
	if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);

	const { data, error } = await query.select().single();
	if (error) {
		console.log(error);
		throw new Error(`Cabin could not be created: ${error}`);
	}
	// 2:Upload image:
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image, {
			cacheControl: "3600",
			upsert: false,
		});
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		throw new Error("Image could not be uploaded and cabin was not created.");
	}
	console.log(data);
	return data;
}
