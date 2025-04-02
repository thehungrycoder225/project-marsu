import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

const Faqs = (title, description) => {
  return (
    <Disclosure>
    <DisclosureButton className="group flex items-center gap-2">
      Do you offer technical support?
      <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
    </DisclosureButton>
    <div className="overflow-hidden py-2">
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
          Yes! You can purchase a license that you can share with your entire team.
        </DisclosurePanel>
      </div>
  </Disclosure>
  )
}

export default Faqs