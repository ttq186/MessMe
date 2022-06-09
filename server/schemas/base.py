from pydantic import BaseModel

import utils


class CamelModel(BaseModel):
    class Config:
        alias_generator = utils.to_camel
        allow_population_by_field_name = True
