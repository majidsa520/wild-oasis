import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { fullName, avatar: "" } },
	});
	if (error) throw new Error(error.message);
	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw new Error(error.message);
	return data;
}
export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;
	const { data, error } = await supabase.auth.getUser();
	if (error) throw new Error(error.message);
	return data?.user;
}
export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}
export async function updateCurrentUser({
	fullName,
	password,
	avatar,
	currentAvatarPath,
}) {
	// update fullName or password (only 1)
	let updateData;
	if (fullName) updateData = { data: { fullName } };
	if (password) updateData = { password };
	const { data, error } = await supabase.auth.updateUser(updateData);
	if (error) throw new Error(error);
	if (!avatar) return data;

	// update the avatar
	const avatarFormat = avatar.name.split(".").at(-1);
	const avatarName = `avatar-${data.user.id}-${Math.random()}.${avatarFormat}`;
	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(avatarName, avatar);
	if (storageError) throw new Error(storageError.message);

	// update avatar path in userdata
	const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;
	const { error: avatarPathError } = await supabase.auth.updateUser({
		data: { avatar: avatarPath },
	});
	if (avatarPathError) {
		await supabase.storage.from("avatars").remove(avatarName);
		throw new Error(avatarPathError);
	}

	// remove old avatar from database
	const index = currentAvatarPath.indexOf("avatar-");
	currentAvatarPath = currentAvatarPath.substr(index);
	await supabase.storage.from("avatars").remove([currentAvatarPath]);
	return data;
}
