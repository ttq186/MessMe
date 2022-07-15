import uuid


def generate_uuid() -> str:
    return str(uuid.uuid4())


def to_camel(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


def generate_message_channel_by_users_id(first_id: str, second_id: str) -> str:
    if first_id <= second_id:
        return f"messages-{first_id}-{second_id}"
    return f"messages-{second_id}-{first_id}"


def generate_contact_requests_channel(user_id: str) -> str:
    return f"contact-requests-{user_id}"
