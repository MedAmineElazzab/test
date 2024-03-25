import { Agenda } from "@/api";
import { Box, Flex, RichTextDisplayer, Text } from "@/components";
import { Wording } from "@/lib";

interface AgendaOrganiserWordProps extends Pick<Agenda, "organizerWord"> {}
export function AgendaOrganiserWord(props: AgendaOrganiserWordProps) {
  return (
    props.organizerWord != null && (
      <div className="flex flex-col gap-4">
        <div className="description-area bg-gray-50 p-8 min-h-80 gap-4 flex flex-col">
          <h2 className="text-gray-900 font-semibold texts-base">
            {Wording.organizerWord}
          </h2>

          <Flex direction={"column"} className="gap-3">
            <RichTextDisplayer
              className="text-gray-500 text-sm leading-8"
              dangerouslySetInnerHTML={{
                __html: props.organizerWord.message,
              }}
            />
            {props.organizerWord.quote != null && (
              <Box className="pl-3 border-l-2 border-l-primary-normal">
                <q className="text-2xl font-medium italic leading-9  ">
                  {props.organizerWord.quote.message}
                </q>
                <br />
                <Text className="mt-6 text-base text-gray-500">{`— ${props.organizerWord.quote.quotedBy}`}</Text>
              </Box>
            )}
          </Flex>
        </div>
      </div>
    )
  );
}
