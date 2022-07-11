import uuid


def generate_uuid() -> str:
    return str(uuid.uuid4())


def to_camel(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


def generate_channel_by_users_id(
    first_id: str, second_id: str, channel_type: str
) -> str:
    if first_id <= second_id:
        return f"{channel_type}-{first_id}-{second_id}"
    return f"{channel_type}-{second_id}-{first_id}"
