'use client';

import { IoExtensionPuzzle } from 'react-icons/io5';
import { FaAppStoreIos } from 'react-icons/fa6';
import { LuClipboardCopy } from 'react-icons/lu';
import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { AppWindow, Folder, Star } from 'lucide-react';

export function CMDK() {
  const [value, setValue] = React.useState('linear');
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    inputRef?.current?.focus();
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog
      className="fixed left-1/2 top-1/2 max-h-[40vh]  w-[640px]  -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 font-sans shadow-lg outline-none dark:bg-gray-800"
      open={open}
      value={value}
      onValueChange={(v) => setValue(v)}
    >
      <div
        className="h-4 bg-gradient-to-b from-white to-transparent dark:from-gray-800 dark:to-transparent"
        cmdk-raycast-top-shine=""
      />

      <Command.Input
        ref={inputRef}
        autoFocus
        placeholder="Search for apps and commands..."
        className="mb-2 w-full bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400"
      />

      <hr
        className="my-2 border-t border-gray-200 dark:border-gray-700"
        cmdk-raycast-loader=""
      />

      <Command.List
        ref={listRef}
        className="max-h-[50vh] min-h-[50vh] overflow-auto"
      >
        <Command.Empty className="p-4 text-sm text-gray-500 dark:text-gray-400">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Suggestions"
          className="items-left ease-in-outdark:text-white mr-2 flex cursor-pointer flex-col gap-3 rounded-xl p-2 text-sm font-medium text-gray-900 transition-all duration-150"
        >
          <Item value="Linear" keywords={['issue', 'sprint']}>
            <FaAppStoreIos />
            aaa
          </Item>
        </Command.Group>

        <Command.Group
          heading="Commands"
          className="items-left mr-2 flex cursor-pointer flex-col gap-3 rounded-xl p-2 text-sm font-medium text-gray-900 transition-all duration-150 ease-in-out  dark:text-white"
        >
          <Item
            isCommand
            value="Clipboard History"
            keywords={['copy', 'paste', 'clipboard']}
          >
            <LuClipboardCopy />
            Clipboard History
          </Item>
          <Item
            isCommand
            value="Import Extension"
            keywords={['import', 'extension']}
          >
            <IoExtensionPuzzle />
            Import Extension
          </Item>
          <Item
            isCommand
            value="Manage Extensions"
            keywords={['manage', 'extension']}
          >
            Manage Extensions
          </Item>
        </Command.Group>
      </Command.List>

      <div
        className="mt-2 border-t border-gray-200 pt-2 dark:border-gray-700"
        cmdk-raycast-footer=""
      >
        <button
          className="w-full rounded px-2 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          cmdk-raycast-open-trigger=""
        >
          Open Application
          <kbd className="ml-2 rounded bg-gray-200 px-1 py-0.5 text-xs dark:bg-gray-700">
            ↵
          </kbd>
        </button>
        <hr className="my-2 border-t border-gray-200 dark:border-gray-700" />
        <SubCommand
          listRef={listRef}
          selectedValue={value}
          inputRef={inputRef}
        />
      </div>
    </Command.Dialog>
  );
}

function Item({
  children,
  value,
  keywords,
  isCommand = false
}: {
  children: React.ReactNode;
  value: string;
  keywords?: string[];
  isCommand?: boolean;
}) {
  return (
    <Command.Item
      className="flex items-center gap-2 rounded-xl p-2 text-sm font-medium text-gray-900 transition-all duration-150 ease-in-out hover:bg-blue-500 hover:text-white dark:text-white"
      value={value}
      keywords={keywords}
      onSelect={() => {}}
    >
      {children}
      <span cmdk-raycast-meta="">{isCommand ? 'Command' : 'Application'}</span>
    </Command.Item>
  );
}

function SubCommand({
  inputRef,
  listRef,
  selectedValue
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLElement>;
  selectedValue: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  React.useEffect(() => {
    const el = listRef.current;

    if (!el) return;

    if (open) {
      el.style.overflow = 'hidden';
    } else {
      el.style.overflow = '';
    }
  }, [open, listRef]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal>
      <Popover.Trigger
        cmdk-raycast-subcommand-trigger=""
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        Actions
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </Popover.Trigger>
      <Popover.Content
        side="top"
        align="end"
        className="raycast-submenu"
        sideOffset={16}
        alignOffset={0}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          inputRef?.current?.focus();
        }}
      >
        <Command>
          <Command.List>
            <Command.Group heading={selectedValue}>
              <SubItem shortcut="↵">
                <AppWindow />
                Open Application
              </SubItem>
              <SubItem shortcut="⌘ ↵">
                <Folder />
                Show in Finder
              </SubItem>
              <SubItem shortcut="⌘ I">
                <Folder />
                Show Info in Finder
              </SubItem>
              <SubItem shortcut="⌘ ⇧ F">
                <Star />
                Add to Favorites
              </SubItem>
            </Command.Group>
          </Command.List>
          <Command.Input placeholder="Search for actions..." />
        </Command>
      </Popover.Content>
    </Popover.Root>
  );
}

function SubItem({
  children,
  shortcut
}: {
  children: React.ReactNode;
  shortcut: string;
}) {
  return (
    <Command.Item>
      {children}
      <div cmdk-raycast-submenu-shortcuts="">
        {shortcut.split(' ').map((key) => {
          return <kbd key={key}>{key}</kbd>;
        })}
      </div>
    </Command.Item>
  );
}
