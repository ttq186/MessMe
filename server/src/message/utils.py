def generate_message_channel_by_users_id(first_id: str, second_id: str) -> str:
    return f"messages:{min(first_id, second_id)}-{max(first_id, second_id)}"
